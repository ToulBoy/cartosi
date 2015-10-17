package synapse.carto.authentification;

import java.security.Principal;

public class CartoSiUser implements Principal {

	private String name;

	public CartoSiUser(String name) {
		this.name = name;
	}

	@Override
	public String getName() {
		return name;
	}

}
