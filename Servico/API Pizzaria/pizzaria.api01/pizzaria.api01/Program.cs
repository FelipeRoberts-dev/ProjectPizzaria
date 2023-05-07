using Microsoft.Data.SqlClient;
using OfficeOpenXml;
using pizzaria.api01.Interface;
using pizzaria.api01.Model;
using pizzaria.api01.Repositorio;
using System.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

string connectionString = @"Data Source=localhost;User ID=sa;Password=123;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False; Initial Catalog=Pizzaria";
builder.Services.AddTransient<IDbConnection>((sp) => new SqlConnection(connectionString));
builder.Services.AddScoped<IMateriaPrima<MateriaPrimas>, MateriaPrimaRepositorio>();
builder.Services.AddScoped<FiltroMateriaPrimaRepository>();
builder.Services.AddScoped<FiltroMateriaPrimaRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyMethod();
        policy.AllowAnyHeader();
    });
});



ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder.AllowAnyOrigin();
    builder.AllowAnyMethod();
    builder.AllowAnyHeader();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
