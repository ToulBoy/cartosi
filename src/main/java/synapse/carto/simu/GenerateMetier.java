package synapse.carto.simu;

import synapse.carto.data.Metier;
import synapse.carto.repo.MetierRepo;

public class GenerateMetier {

	public static Metier getMetier(int i) {
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

		MetierRepo repo = new MetierRepo();

		for (int i = 0; i < 4; i++) {
			Metier metier = GenerateMetier.getMetier(i);
			repo.store(metier, metier.id);
		}
	}
}
