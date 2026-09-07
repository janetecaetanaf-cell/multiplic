// Cria (ou atualiza) o usuario administrador inicial do painel.
// Uso: node scripts/create-admin.js "nome" "email" "senha"
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

async function main() {
  const [, , nome, email, senha] = process.argv;

  if (!nome || !email || !senha) {
    console.error('Uso: node scripts/create-admin.js "Nome" "email@exemplo.com" "senha"');
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const senhaHash = await bcrypt.hash(senha, 10);
  const codigoReferencia = email.split("@")[0].toLowerCase();

  const usuario = await prisma.usuario.upsert({
    where: { email },
    update: { nome, senhaHash, papel: "ADMIN", ativo: true },
    create: { nome, email, senhaHash, papel: "ADMIN", codigoReferencia },
  });

  console.log("Usuario admin pronto:", usuario.email);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
