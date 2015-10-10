package synapse.carto.data;

import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Email {

	public String subject;

	public String texte;

	public List<String> adresse;
	
	public Date date = new Date();

	public Email() {
		// TODO Auto-generated constructor stub
	}

	public Email(String subject, String texte, List<String> adresse) {
		super();
		this.subject = subject;
		this.texte = texte;
		this.adresse = adresse;
	}

	@Override
	public String toString() {
		return "Email [subject=" + subject + ", texte=" + texte + ", adresse="
				+ adresse + "]";
	}

}
