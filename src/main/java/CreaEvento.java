import java.io.*;

import javax.servlet.http.HttpSession;
import javax.servlet.http.*;
import javax.servlet.*;

import java.sql.*;

//import DAO.*;
import beans.*;

// This servlet is used to handle the sign-up process
// It asks for:
// - titolo
// - sottotitolo
// - descrizione
// - tipologiaEvento
// - luogo
// - data
// - ora
// - image
// - tipologiaBiglietti
// - prezzo
// - sconto
// - numeroClick
//
public class CreaEvento extends HttpServlet {
  
  @Override
  public void init(ServletConfig config) throws ServletException {

    super.init(config);

    // Loading the driver
    try {

      Class.forName("org.apache.derby.jdbc.ClientDriver");
    }
    catch (ClassNotFoundException e) {

      throw new ServletException("Driver not found");
    }
  }

  // Handle POST Requests
  @Override
  protected void doPost (HttpServletRequest req,
                     HttpServletResponse res)
    throws ServletException, IOException
  {

      // DB Connection
      try {

        // Get connection from session,
        // Assuming that the connection is already established
        HttpSession session = req.getSession(false);
        SessionConnection scon = (SessionConnection) session.getAttribute("sessionconnection");
        if (scon == null) {
          throw new Exception("Connessione non stabilita");
        }
        
        Connection con = scon.getConnection();

        // Get parameters 
        String titolo = req.getParameter("titolo");
        String sottotitolo = req.getParameter("sottotitolo");
        String descrizione = req.getParameter("descrizione");
        TipologiaEventoEnum tipologiaEvento = TipologiaEventoEnum.valueOf(req.getParameter("tipologiaEvento"));
        LuogoEnum luogo = LuogoEnum.valueOf(req.getParameter("luogo"));
        String data = req.getParameter("data");
        String ora = req.getParameter("ora");
        //String image = req.getParameter("image"); // TODO
        TipologiaBigliettiEnum tipologiaBiglietti = TipologiaBigliettiEnum.valueOf(req.getParameter("tipologiaBiglietti"));
        float prezzo = Float.parseFloat(req.getParameter("prezzo"));
        float sconto = Float.parseFloat(req.getParameter("sconto"));
        int numeroClick = Integer.parseInt(req.getParameter("numeroClick"));

        // Check if any of those variable is empty
        if (titolo.isEmpty() || sottotitolo.isEmpty() || 
            descrizione.isEmpty() || data.isEmpty() || ora.isEmpty()) {

            throw new Exception("Uno o piu' campi sono vuoti");
        }

        //Create Java Bean for event
        EventoBean eventoBean = new EventoBean(titolo,
                        sottotitolo, descrizione, TipologiaEventoEnum.Concerti,
                        LuogoEnum.Trento, data, ora, new byte[10], TipologiaBigliettiEnum.Seduti,
                        prezzo, sconto, numeroClick);
       

        // Check if the event already exists
        if (EventoDAO.EventoExists(eventoBean, con)) {
            throw new Exception("Evento gia' esistente");
        }


        // Insert the user in the database
        EventoDAO.AggiungiEvento(eventoBean, con);


        // TODO: Redirect to OK page
        req.setAttribute("error", "Evento creato con successo");
    	req.getRequestDispatcher("/error").forward(req, res);

      }
      catch (Exception e) {

        req.setAttribute("error", "(CreaEvento) Errore: " + e.getMessage() );
        req.getRequestDispatcher("/error").forward(req, res);
      }

  }

  protected void doGet (HttpServletRequest req,
  		     HttpServletResponse res)
     throws ServletException, IOException
  {
    
    res.setCharacterEncoding("UTF-8");
    req.getRequestDispatcher("/WEB-INF/CreaEvento.jsp").include(req, res);
    
  }
}
