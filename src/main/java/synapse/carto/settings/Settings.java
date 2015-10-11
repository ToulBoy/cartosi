package synapse.carto.settings;

import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

@XmlRootElement
public class Settings {

	public static String ID = "settings.xml";
	public Email email = new Email();

}
