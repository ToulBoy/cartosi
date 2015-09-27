package synapse.carto.repo;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

import org.apache.log4j.Logger;

public class AbstractSiRepo<T> {

	private static Logger logger = Logger.getLogger(AbstractSiRepo.class);

	public synchronized void store(T entity, String id) {
		try {

			JAXBContext jaxbContext = JAXBContext
					.newInstance(entity.getClass());

			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();

			// output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);

			@SuppressWarnings("unchecked")
			File file = getFile(id, (Class<T>) entity.getClass());

			if (!file.exists()) {
				try {
					file.createNewFile();
				} catch (Exception e) {
					throw new RuntimeException(e);
				}
			}

			jaxbMarshaller.marshal(entity, file);

		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}

	}

	
	
	
	private File getRoot( Class<T> type) {
		File projectDirectory = new File(System.getProperty("user.home")
				+ File.separator + ".cartosi" + File.separator
				+ type.getSimpleName().toLowerCase());
		
		if (!projectDirectory.exists()) {

			projectDirectory.mkdirs();
			logger.info("création du répertoire de configuration  "
					+ projectDirectory.getAbsolutePath());

		}
		return projectDirectory;

	}
	private File getFile(String id, Class<T> type) {
		
		
		File projectDirectory = getRoot(type);
		
		

		File file = new File(projectDirectory.getAbsolutePath()
				+ File.separator + id);

		return file;
	}

	@SuppressWarnings("unchecked")
	public T get(String id, Class<T> type) {
		T instance = null;
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(type);

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();

			File file = getFile(id, type);
			if (!file.exists()) {
				return null;
			}

			instance = (T) jaxbUnmarshaller.unmarshal(file);
		} catch (JAXBException e) {
			throw new RuntimeException(e);
		}
		return instance;
	}

	public List<T> getAll(Class<T> type) {
		List<T> instances = new ArrayList<T>();

		File projectDirectory = getRoot(type);
		
		if (projectDirectory.list() == null) {
			return instances;
		}
		for (String id : projectDirectory.list()) {

			instances.add(this.get(id, type));
		}

		return instances;
	}

	public void delete(String id, Class<T> type) {

		File file = getFile(id, type);

		if (file.exists()) {
			file.delete();
		}
	}

}
