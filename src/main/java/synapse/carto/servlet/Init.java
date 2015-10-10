package synapse.carto.servlet;

import javax.servlet.ServletConfig;
import javax.servlet.http.HttpServlet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import synapse.carto.cron.EmailSenderCron;
import synapse.carto.simu.GenerateMetier;
import synapse.carto.simu.GenerateProject;
import synapse.carto.simu.GenerateResponsable;

public class Init extends HttpServlet {

	private static final long serialVersionUID = -7846912230055159750L;

	protected final static Log log = LogFactory.getLog(Init.class);

	@Override
	public void init(ServletConfig config) {
		try {
			
			GenerateProject.main(null);
			GenerateMetier.main(null);
			GenerateResponsable.main(null);
			EmailSenderCron.init();
			
		} catch (Exception e) {
			log.error("Probleme lors de l'initialisation de la servlet " + e);
		}
	}
}
