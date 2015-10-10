package synapse.carto.api.data;

import java.util.HashMap;
import java.util.List;

import synapse.carto.data.Metier;
import synapse.carto.data.Project;

public class ProjectResponse {

	public List<Metier> metiers;
	public List<Project> projects;
	public int nbProjects=0;
	public int nbResponsable=0;
	public int nbLinks=0;
	public int nbMetiers=0;
	
	public ProjectResponse(List<Metier> metiers,List<Project> projects) {
		
		HashMap<String, String> hashMapResponsable = new HashMap<String, String>();
		HashMap<String, String> hashMapMetier = new HashMap<String, String>();

		this.metiers = metiers;
		this.projects = projects;
		this.nbProjects = projects.size();
		
		
		for(Project key : projects){
			if(!hashMapResponsable.containsKey(key)){
				hashMapResponsable.put(key.responsable, key.responsable);
			}
			
			if(!hashMapMetier.containsKey(key)){
				hashMapMetier.put(key.metier, key.metier);
			}
			
			if(key.links!=null){
				nbLinks= nbLinks+ key.links.size();
			}
			
		}
		
		
		this.nbResponsable = hashMapResponsable.size();
		this.nbMetiers = hashMapMetier.size();
		
		// TODO Auto-generated constructor stub
	}
}
