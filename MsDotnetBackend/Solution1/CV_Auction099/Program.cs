using CV_Auction099.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace CV_Auction099
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();

            // Register DbContext with dependency injection
            builder.Services.AddDbContext<cvAuction01Context>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("conStr")));


            // Add Swagger for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "CV Auction API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please Enter a token",
                    Name = "Authorization",
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            // CORS setup
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            var app = builder.Build();

            // Swagger UI and Developer exception page setup
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }

            // Middlewares setup
            app.UseHttpsRedirection();
            app.UseCors("AllowAll");
            // app.UseAuthentication(); // Authentication middleware removed for now
            app.UseAuthorization();

            // Map controllers to handle requests
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
