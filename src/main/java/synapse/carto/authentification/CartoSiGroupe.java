package synapse.carto.authentification;

import java.security.Principal;

public class CartoSiGroupe implements Principal {

	private String name;

	public CartoSiGroupe(String name) {
		this.name = name;
	}

	@Override
	public String getName() {
		return name;
	}

}
