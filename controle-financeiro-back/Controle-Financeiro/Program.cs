using ControleFinanceiro.Application.Services;
using ControleFinanceiro.Domain.Interfaces;
using ControleFinanceiro.Infrastructure.Repositories;
using ControleFinanceiro.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using QuestPDF.Infrastructure;
using ControleFinanceiro.Application.Features.UsuarioFeature.Commands;
using ControleFinanceiro.Application.Features.UsuarioFeature.Queries;
using ControleFinanceiro.Application.Features.TransacoesFeature.Commands.AdicionarTransacao;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.FiltrarTransacoesMesAno;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ListarTransacoesDoUsuario;
using ControleFinanceiro.Application.Features.TransacoesFeature.Services;
using ControleFinanceiro.Application.Features.TransacoesFeature.Commands.Recorrencias;
using ControleFinanceiro.Application.Features.TransacoesFeature.Queries.ComparativoMesAnterior;

QuestPDF.Settings.License = LicenseType.Community;

var builder = WebApplication.CreateBuilder(args);

// Configurações de serviços
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new() { Title = "ControleFinanceiro API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Insira o token JWT no campo abaixo. Ex: Bearer {seu token}"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
 {
 {
 new Microsoft.OpenApi.Models.OpenApiSecurityScheme
 {
 Reference = new Microsoft.OpenApi.Models.OpenApiReference
 {
 Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
 Id = "Bearer"
 }
 },
 new string[] {}
 }
 });
});

// Conexão com banco
builder.Services.AddDbContext<AppDbContext>(options =>
 options.UseSqlServer("Server=MOSTEN0055\\SQLEXPRESS;Database=ControleFinanceiro;Trusted_Connection=True;TrustServerCertificate=True;"));

// Repositórios e Serviços
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<ITransacaoRepository, TransacaoRepository>();
builder.Services.AddScoped<IRecorrenciaTransacaoRepository, RecorrenciaTransacaoRepository>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<PdfService>();
builder.Services.AddScoped<ExcelService>();
builder.Services.AddScoped<TokenService>();

// Serviços de aplicação
builder.Services.AddScoped<IRecorrenciaService, RecorrenciaService>();

// Handlers de usuário
builder.Services.AddScoped<CadastrarUsuarioCommandHandler>();
builder.Services.AddScoped<LoginUsuarioCommandHandler>();
builder.Services.AddScoped<BuscarUsuarioPorEmailQueryHandler>();

// Handlers de transação
builder.Services.AddScoped<TransacaoCommandHandler>();
builder.Services.AddScoped<FiltrarTransacoesMesAnoQueryHandler>();
builder.Services.AddScoped<ListarTransacoesDoUsuarioQueryHandler>();

// Handler comparativo
builder.Services.AddScoped<ComparativoMesAnteriorQueryHandler>();

// Handlers de recorrência
builder.Services.AddScoped<CriarRecorrenciaCommandHandler>();

// Configuração do JWT
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
     .AllowAnyHeader()
     .AllowAnyMethod();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
