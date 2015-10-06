package synapse.carto.api;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import synapse.carto.data.Metier;
import synapse.carto.repo.MetierRepo;

@Path("/metier")
public class MetierAPI {

	protected final Log logger = LogFactory.getLog(getClass());

	
	MetierRepo repo = new MetierRepo();
	
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Response get(@PathParam("id") String id) {

		Metier projet = repo.get(id,Metier.class);
		try {
			if (projet == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas de projet avec l'id '" + id + "'")
						.build();
			}

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok(projet).build();

	}

	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public Response delete(@PathParam("id") String id) {

		Metier projet = repo.get(id,Metier.class);
		try {
			if (projet == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas de projet avec l'id '" + id + "'")
						.build();
			}

			repo.delete(id,Metier.class);

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok("ok").build();

	}

	@PUT
	@Path("/{id}")
	@Produces("application/json")
	public Response put(@PathParam("id") String id, Metier metier) {
			
		repo.store(metier, id);

		return Response.ok(metier).build();

	}

	
	
	@GET
	@Path("/")
	@Produces("application/json")
	public Response get() {

		return Response.ok(repo.getAll(Metier.class)).build();

	}

	
	
	
}
