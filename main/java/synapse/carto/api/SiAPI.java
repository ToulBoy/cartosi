package synapse.carto.api;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.jboss.resteasy.annotations.Form;

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
	@Path("/{id}")
	@Produces("application/json")
	public Response get(@PathParam("id") String id) {

		Si si = null;
		try {

			si = Si.get();
			if (si == null) {
				return Response
						.status(Status.NOT_FOUND)
						.entity("désolé pas de si trouvée avec l'id '" + id
								+ "'").build();
			}

		} catch (Exception e) {
			return Response.serverError().build();
		}

		return Response.ok(si).build();

	}

	@GET
	@Path("/{id}")
	@Produces("application/json")
	public Response put(@PathParam("id") String id, Si si) {

		Si.store(si);

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
		
		for(Project project : prc){
			if(project.isFilter(filter)){
				projects.add(project);
			}
		}
		

		return Response.ok(new ProjectResponse(metiers, projects)).build();

	}

}
