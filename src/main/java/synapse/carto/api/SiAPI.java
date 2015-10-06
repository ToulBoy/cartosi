package synapse.carto.api;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import synapse.carto.data.Filter;
import synapse.carto.data.Metier;
import synapse.carto.data.Project;
import synapse.carto.data.Si;
import synapse.carto.repo.ProjetRepo;

@Path("/si")
public class SiAPI {

	protected final Log logger = LogFactory.getLog(getClass());

	ProjetRepo repo = new ProjetRepo();

	@GET
	@Path("/")
	@Produces("application/json")
	public Response get() {

		Si si = new Si(repo.getAll(Project.class));

		return Response.ok(si).build();

	}

	@GET
	@Path("/search")
	@Produces("application/json")
	public Response filter(@QueryParam("metier") String metier) {
		List<Project> projects = new ArrayList<Project>();
		List<Metier> metiers = new ArrayList<Metier>();

		Filter filter = new Filter();

		filter.metier = metier;

		List<Project> prc = repo.getAll(Project.class);

		for (Project project : prc) {
			if (project.isFilter(filter)) {
				projects.add(project);
			}
		}

		return Response.ok(new ProjectResponse(metiers, projects)).build();

	}

}
