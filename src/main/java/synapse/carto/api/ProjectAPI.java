package synapse.carto.api;

import javax.annotation.security.PermitAll;
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

import synapse.carto.data.Project;
import synapse.carto.repo.ProjetRepo;

@RolesAllowed("admin")
@Path("/project")
public class ProjectAPI {

	protected final Log logger = LogFactory.getLog(getClass());

	ProjetRepo repo = new ProjetRepo();

	@RolesAllowed({"reader","manager"})
	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Response get(@PathParam("id") String id) {

		Project projet = repo.get(id, Project.class);
		try {
			if (projet == null) {
				return Response.status(Status.NOT_FOUND).build();
			}

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok(projet).build();

	}

	@RolesAllowed({"manager"})
	@DELETE
	@Path("/{id}")
	@Produces("application/json")
	public Response delete(@PathParam("id") String id) {

		Project projet = repo.get(id, Project.class);
		try {
			if (projet == null) {
				return Response.status(Status.NOT_FOUND).build();
			}

			repo.delete(id, Project.class);

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok("ok").build();

	}

	@RolesAllowed({"manager"})
	@PUT
	@Path("/{id}")
	@Produces("application/json")
	public Response put(@PathParam("id") String id, Project projet) {

		if (id == null && repo.get(id, Project.class) != null) {
			return Response.status(Status.CONFLICT).build();
		} else if (id == null) {
			id = projet.id;
		}

		repo.store(projet, id);

		return Response.ok(projet).build();

	}

	@RolesAllowed({"reader","manager"})
	@GET
	@Path("/")
	@Produces("application/json")
	@PermitAll
	public Response get() {

		return Response.ok(repo.getAll(Project.class)).build();

	}

}
