import { Injectable } from '@nestjs/common';
import { FeatureInterface } from '../Interfaces/feature.interface';

@Injectable()
export class HomeService {
  getFeatures(): FeatureInterface[] {
    return [
      {
        title: 'Documentation',
        url: 'https://nextjs.org/docs',
        description:
          'Find in-depth information about Next.js features and API.',
      },
      {
        title: 'Learn',
        url: 'https://nextjs.org/learn',
        description:
          'Learn about Next.js in an interactive course with quizzes!',
      },
      {
        title: 'Examples',
        url: 'https://github.com/vercel/next.js/tree/master/examples',
        description:
          'Discover and deploy boilerplate example Next.js projects.',
      },
      {
        title: 'Deploy',
        url: 'https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
        description:
          'Instantly deploy your Next.js site to a public URL with Vercel.',
      },
      {
        title: 'Tailwindcss',
        url: 'https://tailwindcss.com/docs/guides/nextjs',
        description: 'Learn how to install tailwindcss with Next.js.',
      },
      {
        title: 'Tailwindcss Example',
        url: '/persons',
        description:
          'See here a component example directly fetched from Nest.js api',
      },
    ];
  }
}
