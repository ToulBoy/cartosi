package synapse.carto.simu;

import synapse.carto.data.Responsable;
import synapse.carto.repo.ResponsableRepo;

public class GenerateResponsable {

	public static Responsable getResponsable(int i) {
		
		Responsable responsable = new Responsable();
		responsable.email = String.valueOf(i)+"@"+String.valueOf(i)+".com";
		
		return 	responsable;	
		}
		// #5bc0de blue
		// #d9534f red
		// #f0ad4e jaune
		// #f5f5f5 gris

	public static void main(String[] args) {
		ResponsableRepo repo = new ResponsableRepo();

		for (int i = 0; i < 75 ; i++) {
			Responsable responsable = getResponsable(i);

			repo.store(responsable, responsable.email);
		}
	

	}

}
