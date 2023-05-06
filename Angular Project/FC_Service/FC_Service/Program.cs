using FC_Service.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<FCDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("FCConnectionString")));

builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (Options) =>
    {
        Options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
    }
    );
}
);
var app = builder.Build(); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("default");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
