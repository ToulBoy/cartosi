package synapse.carto.data;

public class Link {

	public String typeLien;

	public String to;

	public Link(String typeLien, String idProject) {
		super();
		this.typeLien = typeLien;
		this.to = idProject;
	}

	public Link() {
		// TODO Auto-generated constructor stub
	}

}
