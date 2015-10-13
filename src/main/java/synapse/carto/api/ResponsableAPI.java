package synapse.carto.api;

import javax.annotation.security.RolesAllowed;
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

import synapse.carto.data.Responsable;
import synapse.carto.repo.ResponsableRepo;

@RolesAllowed("admin")
@Path("/responsable")
public class ResponsableAPI {

	protected final Log logger = LogFactory.getLog(getClass());

	
	ResponsableRepo repo = new ResponsableRepo();
	
	@RolesAllowed({"reader"})
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Response get(@PathParam("id") String id) {

		Responsable responsable = repo.get(id,Responsable.class);
		try {
			if (responsable == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas de responsable avec l'id '" + id + "'")
						.build();
			}

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok(responsable).build();

	}

	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public Response delete(@PathParam("id") String id) {

		Responsable responsable = repo.get(id,Responsable.class);
		try {
			if (responsable == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas de responsable avec l'id '" + id + "'")
						.build();
			}

			repo.delete(id,Responsable.class);

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok("ok").build();

	}

	@PUT
	@Path("/{id}")
	@Produces("application/json")
	public Response put(@PathParam("id") String id, Responsable responsable) {
			
		repo.store(responsable, id);

		return Response.ok(responsable).build();

	}

	@RolesAllowed({"reader"})
	@GET
	@Path("/")
	@Produces("application/json")
	public Response get() {

		return Response.ok(repo.getAll(Responsable.class)).build();

	}

	
	
	
}
