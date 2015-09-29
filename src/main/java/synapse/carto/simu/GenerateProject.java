package synapse.carto.simu;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import synapse.carto.data.Link;
import synapse.carto.data.Metier;
import synapse.carto.data.Project;
import synapse.carto.data.TypeProjet;
import synapse.carto.repo.ProjetRepo;

public class GenerateProject {


	public static Metier getType(int i) {
		if(i<0){
			i = i*(-1);
		}
		
		
		switch (i) {
		case 0:

			return new Metier("Dédouanement", "#00c0ef");
		case 1:

			return new Metier("Contrôle", "#dd4b39");
		case 2:

			return new Metier("Comptabilité", "#f39c12");

		case 3:

			return new Metier("Recouvrement", "#00a65a");
		default:
			throw new IllegalStateException(String.valueOf(i));
		}
		// #5bc0de blue
		// #d9534f red
		// #f0ad4e jaune
		// #f5f5f5 gris
	}
	
	public static void main(String[] args) {
		ProjetRepo repo = new ProjetRepo();

		int max = 50;
		for (int i = 0; i < max; i++) {

			Project project = new Project();

			project.id = String.valueOf(i);
			project.name = "project " + i;
			project.description = "description of the project" +i;
			int rand = new Random().nextInt() % max;
			if (rand < 0) {
				rand = rand * (-1);
			}

			project.addLink(new Link("1",String.valueOf(rand)));

			project.metier = GenerateMetier.getMetier(new Random().nextInt() % 3);

			project.type = (i==15 || i==35 )? TypeProjet.referentiel : TypeProjet.application;
//			project.type =  ? TypeProjet.referentiel : TypeProjet.application;
			project.responsable = i+"@"+i+".com";
			
			List<String>versions = new ArrayList<String>();
			versions.add(i+"."+1);
			versions.add(i+"."+2);
			versions.add(i+"."+3);
			versions.add(i+"."+4);
			project.versions = versions;
			repo.store(project, project.id);

		}

	}
}
