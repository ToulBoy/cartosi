package synapse.carto.data;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Project {

	public String id;
	public String name;
	public String description;
	public boolean processusLivraisonNormalise;
	public TypeProjet type;
	public String responsable;
	public Metier metier;

	public List<String> versions;

	public List<Link> links;

	public Project() {
		// TODO Auto-generated constructor stub
	}

	public void addLink(Link link) {

		if (links == null) {
			links = new ArrayList<Link>();
		}
		this.links.add(link);

	}

	public boolean isFilter(Filter filter) {

		if (filter.metier != null && !filter.metier.equals(this.metier.name)) {
			return false;
		}
		
		
		if (filter.responsable != null
				&& !filter.responsable.equals(this.responsable)) {
			return false;
		}
		

		// find link project
		boolean findLink = false;
		if (filter.linkto != null) {
			for (Link link : this.links) {
				if (!filter.linkto.equals(link)
						|| filter.linkto.equals(this.id)) {
					findLink = true;
				}
			}
			if (!findLink) {
				return false;
			}
		}

		// find version project
		boolean findVersion = false;
		if (filter.version != null) {
			for (String vers : this.versions) {
				if (!filter.version.equals(vers)
						|| filter.version.equals(this.versions)) {
					findVersion = true;
				}
			}
			if (!findVersion) {
				return false;
			}
		}

		

		return true;
	}

}
