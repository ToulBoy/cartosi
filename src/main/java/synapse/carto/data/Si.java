package synapse.carto.data;

import java.util.HashMap;
import java.util.List;

import synapse.carto.repo.MetierRepo;
import synapse.carto.repo.ResponsableRepo;

public class Si {

	HashMap<String, Stat> projectsByMetier = new HashMap<String, Stat>();
	HashMap<String, Stat> linksByMetier = new HashMap<String, Stat>();
	int nbProjects = 0;
	int nbResponsable = 0;
	int nbLinks = 0;
	int nbMetiers = 0;

	MetierRepo repo = new MetierRepo();
	ResponsableRepo responsableRepo = new ResponsableRepo();

	public Si(List<Project> projects) {

		List<Metier> metiers = repo.getAll(Metier.class);

		List<Responsable> responsables = responsableRepo
				.getAll(Responsable.class);

		if (responsables != null) {
			nbResponsable = responsables.size();
		}

		if (metiers != null) {
			nbMetiers = metiers.size();
		}

		if (projects == null)
			return;

		nbProjects = projects.size();

		for (Project project : projects) {

			Stat byMetier = projectsByMetier.get(project.metier);

			if (byMetier == null) {
				byMetier = new Stat();
				Metier metier = repo.get(project.metier, Metier.class);
				byMetier.value = 0;
				byMetier.label = metier.id;
				byMetier.color = metier.color;
			}

			byMetier.value++;
			projectsByMetier.put(project.metier, byMetier);

			if (project.links == null) {
				continue;
			}

			nbLinks += project.links.size();

			Stat byLinks = linksByMetier.get(project.metier);

			if (byLinks == null) {
				byLinks = new Stat();
				Metier metier = repo.get(project.metier, Metier.class);
				byLinks.value = 0;
				byLinks.label = metier.id;
				byLinks.color = metier.color;
			}

			byLinks.value += project.links.size();

			linksByMetier.put(project.metier, byLinks);

		}
	}

	public HashMap<String, Stat> getLinksByMetier() {
		return linksByMetier;
	}

	public HashMap<String, Stat> getProjectsByMetier() {
		return projectsByMetier;
	}

	public int getNbMetiers() {
		return nbMetiers;
	}
	
	
	public int getNbProjects() {
		return nbProjects;
	}

	public int getNbResponsable() {
		return nbResponsable;
	}

	public int getNbLinks() {
		return nbLinks;
	}

}
