package synapse.carto.data;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Metier {

	public String id;
	
	public String color;

	public Metier() {
		// TODO Auto-generated constructor stub
	}

	public Metier(String name, String color) {
		super();
		this.id = name;
		this.color = color;
	}



}
