import { Media, PrismaClient } from '@prisma/client';
import fs from 'fs';

interface CreateMedia extends Omit<Media, "id"| "createdAt" | "updatedAt"> {}
interface UpdateMedia extends Partial<Media> {}

export class MediaService {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient();
    }

    async createMedia(data:CreateMedia): Promise<Media> {
        return await this.prisma.media.create({
            data,
        })
    }

    async deleteMedia(id: string): Promise<void> {
      const media: Media = await this.prisma.media.findUnique({
        where: {id},
      });

      if(!media) {
        return;
      }
      const filename = `${media.path}/${media.name}`;
      await this.prisma.media.delete({
        where: {
            id,
        },
      });

      if(!fs.existsSync(filename)){
        return;
      }

      fs.unlinkSync(filename);
    }
}
