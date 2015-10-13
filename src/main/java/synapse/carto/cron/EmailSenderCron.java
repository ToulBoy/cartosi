package synapse.carto.cron;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.mail.internet.InternetAddress;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.mail.HtmlEmail;
import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import synapse.carto.data.Email;
import synapse.carto.repo.EmailRepo;
import synapse.carto.repo.SettingEmailRepo;
import synapse.carto.settings.Settings;

@DisallowConcurrentExecution
public class EmailSenderCron implements Job {

	protected final static Log logger = LogFactory
			.getLog(EmailSenderCron.class);

	EmailRepo emailRepo = new EmailRepo();
	SettingEmailRepo settingEmailRepo = new SettingEmailRepo();

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		try {

			logger.debug("Beginning cron send email ...");
			
			Settings setting = settingEmailRepo.get(Settings.ID,
					Settings.class);

			if (setting == null ) {
				setting = new Settings();
				settingEmailRepo.store(setting,Settings.ID);
				logger.info("Setting not configured, the system will initialize");
			}
			if(setting.email.isConfig()){
				logger.info("Email settings not set edit the file : " + System.getProperty("user.home")
						+ File.separator + ".cartosi" + File.separator +"settings/settings.xml");
				return ;
			}
			HtmlEmail senderEmail = setting.email.getSender();

			

			List<Email> emails = emailRepo.getAll(Email.class);

			for (Email email : emails) {

				Collection<InternetAddress> emailAdresse = new ArrayList<InternetAddress>();
				for (String adresse : email.adresse) {

					emailAdresse.add(new InternetAddress(adresse));

				}

				senderEmail.setCc(emailAdresse);
				senderEmail.send();
				emailRepo.delete(email.id, Email.class);

				logger.info("send email " + email.subject);
			}
		} catch (Exception e) {
			logger.error("error send email " + e);
			throw new RuntimeException(e);
		}

		logger.debug("End cron send email ...");

	}

	public static void init() {

		try {

			// specify the job' s details..
			JobDetail job = JobBuilder.newJob(EmailSenderCron.class)
					.withIdentity(EmailSenderCron.class.getName()).build();
			// specify the running period of the job
			Trigger trigger = TriggerBuilder
					.newTrigger()
					.withSchedule(
							SimpleScheduleBuilder.simpleSchedule()
									.withIntervalInMinutes(1).repeatForever())
					.build();

			// schedule the job
			StdSchedulerFactory.getDefaultScheduler().scheduleJob(job, trigger);
			

		} catch (Exception e) {
			logger.fatal("Problème de l'instanciation du job "
					+ EmailSenderCron.class.getName(), e);
			throw new RuntimeException(e);
		}

	}

	// public static void main(String[] args) throws Exception {
	// new CleanVideoJob().execute(null);
	//
	//
	// }
}
