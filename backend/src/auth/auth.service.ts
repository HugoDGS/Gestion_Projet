import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwtService: JwtService
  ) {}

  verifyJwtToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token); // Décodage du token
      return decoded; // Retourne les données décodées (comme `userId`)
    } catch (error) {
      return null; // Si le token est invalide, on retourne null
    }
  }


  // Méthode d'inscription (signUp)
  async signUp(name: string, email: string, password: string) {
    // Vérifier si l'utilisateur existe déjà
    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new Error('L\'utilisateur avec cet email existe déjà.');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // Créer un nouvel utilisateur dans la base de données
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      return user;  // Retourner l'utilisateur créé (ou autre info pertinente)
    } catch (error) {
      // En cas d'erreur, on peut ajouter plus de détails dans le message
      throw new Error('Une erreur est survenue lors de l\'inscription.');
    }
  }

  // Méthode de connexion (signIn)
  async signIn(email: string, password: string) {
    // Vérifier si l'utilisateur existe dans la base de données
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    // Comparer le mot de passe entré avec celui stocké (hashé)
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new Error('Mot de passe incorrect');
    }

    // Générer un token JWT si l'utilisateur existe et que le mot de passe est valide
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);

    return {
      token,  // Retourner le token d'authentification
    };
  }
}
