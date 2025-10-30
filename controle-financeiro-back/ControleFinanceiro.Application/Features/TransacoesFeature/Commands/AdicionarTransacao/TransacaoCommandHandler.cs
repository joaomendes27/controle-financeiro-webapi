using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ControleFinanceiro.Domain.Entities;
using ControleFinanceiro.Domain.Interfaces;
using Microsoft.AspNetCore.Http;

namespace ControleFinanceiro.Application.Features.TransacoesFeature.Commands.AdicionarTransacao
{
    public class TransacaoCommandHandler
    {
        private readonly ITransacaoRepository _repository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TransacaoCommandHandler(ITransacaoRepository repository, IHttpContextAccessor httpContextAccessor)
        {
            _repository = repository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task Handle(TransacaoCommand command)
        {
            var usuarioId = int.Parse(_httpContextAccessor.HttpContext.User.FindFirst("id").Value);
            var valor = command.Valor;

            if (command.CategoriaId == 1)
                valor = Math.Abs(command.Valor);
            if (command.CategoriaId == 2)
                valor = -Math.Abs(command.Valor);

            var transacao = new Transacao
            {
                Valor = valor,
                Descricao = command.Descricao,
                DataTransacao = command.DataTransacao,
                CategoriaId = command.CategoriaId,
                UsuarioId = usuarioId
            };

            await _repository.AdicionarAsync(transacao);
        }
    }
}
