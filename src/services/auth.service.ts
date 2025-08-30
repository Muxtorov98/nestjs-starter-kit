import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { RegisterDto } from "../dtos/register.dto";
import { LoginDto } from "../dtos/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exist = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exist) throw new UnauthorizedException("Email allaqachon mavjud");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    const savedUser = await this.userRepo.save(user);

    const accessToken = this.generateAccessToken(savedUser);
    const refreshToken = this.generateRefreshToken(savedUser);

    return { user: savedUser, accessToken, refreshToken };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException("Email yoki parol noto‘g‘ri");

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  generateAccessToken(user: User) {
    return this.jwtService.sign({ id: user.id, email: user.email });
  }

  generateRefreshToken(user: User) {
    return this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret', expiresIn: '7d' }
    );
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret',
      });
      const user = await this.userRepo.findOne({ where: { id: payload.id } });
      if (!user) throw new UnauthorizedException("User not found");

      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user);
      return { accessToken, refreshToken };
    } catch (err) {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }
}