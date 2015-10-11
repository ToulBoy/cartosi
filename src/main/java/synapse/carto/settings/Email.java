package synapse.carto.settings;

import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

@XmlRootElement
public class Email {

	public String smtpHost ="";
	public String port="";
	public String login="";
	public String password="";
	public String fromName="";

	public Email() {
		// TODO Auto-generated constructor stub
	}

	public HtmlEmail getSender() throws EmailException {
		HtmlEmail senderEmail = new HtmlEmail();

		senderEmail.setHostName(this.smtpHost);
		senderEmail.setSmtpPort(Integer.valueOf(this.port));
		senderEmail.setAuthenticator(new DefaultAuthenticator(
				this.login, this.password));
		senderEmail.setSSLOnConnect(true);
		senderEmail.setFrom(this.login, this.fromName);

		return senderEmail;
	}

	public boolean isConfig() {
		
		
		if(smtpHost==null || port==null  || login==null || password==null || fromName==null ){
			return false;
		}
		return true;
	}

}
