using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using CV_Auction099.Models; // Ensure this namespace matches your DbContext location

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<cvAuction01Context>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

        // Other services configuration
        services.AddControllers();
    }

    // Other methods omitted for brevity
}
