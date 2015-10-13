package synapse.carto.api;

import java.util.UUID;

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

import synapse.carto.data.Email;
import synapse.carto.repo.EmailRepo;

@RolesAllowed("admin")
@Path("/email")
public class EmailAPI {

	protected final Log logger = LogFactory.getLog(getClass());

	
	EmailRepo repo = new EmailRepo();
	
	@RolesAllowed({"reader","manager"})
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Response get(@PathParam("id") String id) {

		Email email = repo.get(id,Email.class);
		try {
			if (email == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas d'email avec l'id '" + id + "'")
						.build();
			}

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok(email).build();

	}

	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public Response delete(@PathParam("id") String id) {

		Email projet = repo.get(id,Email.class);
		try {
			if (projet == null) {
				return Response.status(Status.NOT_FOUND)
						.entity("désolé pas d'email avec l'id '" + id + "'")
						.build();
			}

			repo.delete(id,Email.class);

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok("ok").build();

	}

	@PUT
	@Path("/")
	@Produces("application/json")
	public Response put(Email email) {
			
		
		UUID uniqueKey = UUID.nameUUIDFromBytes(email.toString().getBytes()); 
		
		
		repo.store(email, uniqueKey.toString());

		return Response.ok(email).build();

	}

	
	@RolesAllowed({"reader","manager"})
	@GET
	@Path("/")
	@Produces("application/json")
	public Response get() {

		return Response.ok(repo.getAll(Email.class)).build();

	}

	
	
	
}
