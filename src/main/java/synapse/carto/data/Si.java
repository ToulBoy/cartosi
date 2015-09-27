package synapse.carto.data;

import java.io.File;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.log4j.Logger;

@XmlRootElement
public class Si {

	String descriptif;
	List<Metier> metiers;
	List<Project> projects;
	int nbProjects;
	int nbResponsable;
	int link;
	
	

	private static Logger logger = Logger.getLogger(Si.class);

	public static synchronized void store(Si si) {
		try {

			JAXBContext jaxbContext = JAXBContext.newInstance(Si.class);

			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

			// output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			jaxbMarshaller.marshal(si, getSettingFile());

		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}

	}

	private static File getSettingFile() {
		File mainDirectory = new File(System.getProperty("user.home")
				+ File.separator + ".cartosi");
		if (!mainDirectory.exists()) {

			mainDirectory.mkdirs();
			logger.info("création du répertoire de configuration "
					+ mainDirectory.getAbsolutePath());
		}

		return new File(mainDirectory.getAbsolutePath() + File.separator
				+ "main.xml");
	}

	public static Si get() {
		Si si = null;
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Si.class);

			File file = getSettingFile();
			if (!file.exists()) {
				logger.info("pas de SI trouvé");
				return null;
			}

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			si = (Si) jaxbUnmarshaller.unmarshal(file);
		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}
		return si;
	}
	
	
	
	

	public String getDescriptif() {
		return descriptif;
	}

	public List<Metier> getMetiers() {
		return metiers;
	}

	public List<Project> getProjects() {
		return projects;
	}

	public int getNbProjects() {
		return nbProjects;
	}

	public int getResponsable() {
		return nbResponsable;
	}

	public int getLink() {
		return link;
	}

	public static Logger getLogger() {
		return logger;
	}

	public static void main(String[] args) {
		Si projet = new Si();
		projet.descriptif = "test";
		store(projet);

		// Si.store(new Si());
		Si si = Si.get();

		System.out.println(si);
	}

}
