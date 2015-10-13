package synapse.carto.listner;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@WebListener
public class SecurityListener implements ServletContextListener {


	protected final static Log log = LogFactory.getLog(SecurityListener.class);

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		try {

			System.setProperty("java.security.auth.login.config",
					SecurityListener.class.getResource("jaas.config").getPath());

		} catch (Exception e) {
			log.error("Probleme lors de l'initialisation de la servlet " + e);
		}
	}
}
