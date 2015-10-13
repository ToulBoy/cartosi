package synapse.carto.listner;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.quartz.SchedulerException;
import org.quartz.impl.StdSchedulerFactory;

import synapse.carto.cron.EmailSenderCron;
import synapse.carto.simu.GenerateMetier;
import synapse.carto.simu.GenerateProject;
import synapse.carto.simu.GenerateResponsable;

@WebListener
public class CronListner implements ServletContextListener {

	protected final static Log log = LogFactory.getLog(CronListner.class);

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {

			GenerateProject.main(null);
			GenerateMetier.main(null);
			GenerateResponsable.main(null);
			EmailSenderCron.init();
			
			StdSchedulerFactory.getDefaultScheduler().start();

		} catch (Exception e) {
			log.error("Probleme lors de l'initialisation de la servlet " + e);
		}

	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		try {
			StdSchedulerFactory.getDefaultScheduler().clear();
		} catch (SchedulerException e) {
			log.error("cron service could not be stop...",e);
		}

	}

}
