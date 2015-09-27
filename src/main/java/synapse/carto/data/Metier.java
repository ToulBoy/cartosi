package synapse.carto.data;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.log4j.Logger;

@XmlRootElement
public class Metier {

	private static Logger logger = Logger.getLogger(Metier.class);

	public String name;
	
	public String color;

	public Metier() {
		// TODO Auto-generated constructor stub
	}

	public Metier(String name, String color) {
		super();
		this.name = name;
		this.color = color;
	}

	private String getid() {
		return name;

	}

	public static synchronized void store(Metier metier) {
		try {

			JAXBContext jaxbContext = JAXBContext.newInstance(Metier.class);

			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

			// output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			jaxbMarshaller.marshal(metier, getProjectFile(metier.getid()));

		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}

	}

	private static File getProjectFile(String id) {
		File metierDirectory = new File(System.getProperty("user.home")
				+ File.separator + ".cartosi" + System.getProperty("user.home")
				+ "metier");
		if (!metierDirectory.exists()) {

			metierDirectory.mkdirs();
			logger.info("création du répertoire de configuration  "
					+ metierDirectory.getAbsolutePath());

		}

		return new File(metierDirectory.getAbsolutePath() + File.separator
				+ id);

	}

	public static Metier get(String id) {
		Metier projet = null;
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Metier.class);

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			projet = (Metier) jaxbUnmarshaller.unmarshal(getProjectFile(id));
		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}
		return projet;
	}

	public static List<Metier> getAll() {
		List<Metier> projets = new ArrayList<Metier>();

		File projectDirectory = new File(System.getProperty("user.home")
				+ File.separator + ".cartosi" + System.getProperty("user.home")
				+ "project");
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Metier.class);
			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

			for (String projetPath : projectDirectory.list()) {

				File file = new File(System.getProperty("user.home")
						+ File.separator + ".cartosi"
						+ System.getProperty("user.home") + "project"
						+ System.getProperty("user.home") + projetPath);
				Metier projet = (Metier) jaxbUnmarshaller.unmarshal(file);
				projets.add(projet);
			}

		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}
		return projets;
	}

}
