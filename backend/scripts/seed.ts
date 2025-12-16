import { db } from '../src/config/database.js';
import type { IDatabase } from 'pg-promise';

interface SeedGame {
  title: string;
  description: string;
  release_date: string;
  rating: number;
  metacritic_score: number;
  platforms: string[];
  genres: string[];
  developer: string;
  publisher: string;
  cover_image: string;
  screenshots: string[];
}

const games: SeedGame[] = [
  {
    title: 'The Witcher 3: Wild Hunt',
    description:
      'The Witcher 3: Wild Hunt is a story-driven, open world RPG set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.',
    release_date: '2015-05-19',
    rating: 9.5,
    metacritic_score: 93,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['RPG', 'Action'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=b694d5aeb8978fbd4bfc13b244a49e0ddaa6086a-12615842-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=b694d5aeb8978fbd4bfc13b244a49e0ddaa6086a-12615842-images-thumbs&n=13&w=800'],
  },
  {
    title: 'Elden Ring',
    description:
      'Elden Ring is an action role-playing game developed by FromSoftware. It features an expansive open world with challenging combat and rich lore.',
    release_date: '2022-02-25',
    rating: 9.6,
    metacritic_score: 96,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Action'],
    developer: 'FromSoftware',
    publisher: 'Bandai Namco',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=4779cc43abb4f923b297bfc166295d6c_l-5402592-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=4779cc43abb4f923b297bfc166295d6c_l-5402592-images-thumbs&n=13&w=800'],
  },
  {
    title: 'Cyberpunk 2077',
    description:
      'Cyberpunk 2077 is an open-world, action-adventure RPG set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    release_date: '2020-12-10',
    rating: 8.5,
    metacritic_score: 86,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Action', 'Shooter'],
    developer: 'CD Projekt Red',
    publisher: 'CD Projekt',
    cover_image:
      'https://avatars.mds.yandex.net/get-mpic/12636049/2a00000193eaa43305e350811a0a0f023436/orig?w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/get-mpic/12636049/2a00000193eaa43305e350811a0a0f023436/orig?w=800'],
  },
  {
    title: 'Red Dead Redemption 2',
    description:
      'Red Dead Redemption 2 is a Western-themed action-adventure game. Developed by Rockstar Games, it features a vast open world and compelling story.',
    release_date: '2018-10-26',
    rating: 9.7,
    metacritic_score: 97,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'Adventure'],
    developer: 'Rockstar Games',
    publisher: 'Rockstar Games',
    cover_image:
      'https://i.ytimg.com/vi/7GzXRdo4GCo/maxresdefault.jpg?v=68bef85e?w=400&h=225&fit=crop',
    screenshots: ['https://i.ytimg.com/vi/7GzXRdo4GCo/maxresdefault.jpg?v=68bef85e?w=800'],
  },
  {
    title: 'God of War Ragnarök',
    description:
      'God of War Ragnarök is an action-adventure game that continues the story of Kratos and Atreus as they journey through the Nine Realms.',
    release_date: '2022-11-09',
    rating: 9.4,
    metacritic_score: 94,
    platforms: ['PlayStation', 'PC'],
    genres: ['Action', 'Adventure'],
    developer: 'Santa Monica Studio',
    publisher: 'Sony Interactive Entertainment',
    cover_image:
      'https://i.ytimg.com/vi/4ZepMaeRC2U/maxresdefault.jpg?w=400&h=225&fit=crop',
    screenshots: ['https://i.ytimg.com/vi/4ZepMaeRC2U/maxresdefault.jpg?w=800'],
  },
  {
    title: 'Horizon Zero Dawn',
    description:
      'Horizon Zero Dawn is an action role-playing game set in a post-apocalyptic world overrun by robotic creatures.',
    release_date: '2017-02-28',
    rating: 8.9,
    metacritic_score: 89,
    platforms: ['PC', 'PlayStation'],
    genres: ['Action', 'RPG'],
    developer: 'Guerrilla Games',
    publisher: 'Sony Interactive Entertainment',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=a0fd28f4b00f88a1014eaa0042fc595b31aab64b-16852849-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=a0fd28f4b00f88a1014eaa0042fc595b31aab64b-16852849-images-thumbs&n=13&w=800'],
  },
  {
    title: "Baldur's Gate 3",
    description: "Baldur's Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons & Dragons.",
    release_date: '2023-08-03',
    rating: 9.7,
    metacritic_score: 96,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['RPG', 'Strategy'],
    developer: 'Larian Studios',
    publisher: 'Larian Studios',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=a5ef7a959afacd6c25b029f1a520dc98_l-3927965-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=a5ef7a959afacd6c25b029f1a520dc98_l-3927965-images-thumbs&n=13&w=800'],
  },
  {
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description:
      'The Legend of Zelda: Tears of the Kingdom is an action-adventure game that expands on the world of Breath of the Wild.',
    release_date: '2023-05-12',
    rating: 9.6,
    metacritic_score: 96,
    platforms: ['Nintendo'],
    genres: ['Adventure', 'Action'],
    developer: 'Nintendo EPD',
    publisher: 'Nintendo',
    cover_image:
      'https://i.ytimg.com/vi/aDCFS9x_JgE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFMgZShhMA8=&rs=AOn4CLBMMA4if9MMH_DDs_fGXa4ZH0VDJA?w=400&h=225&fit=crop',
    screenshots: ['https://i.ytimg.com/vi/aDCFS9x_JgE/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFMgZShhMA8=&rs=AOn4CLBMMA4if9MMH_DDs_fGXa4ZH0VDJA?w=800'],
  },
  {
    title: 'Grand Theft Auto V',
    description: 'Grand Theft Auto V is an action-adventure game set in the fictional state of San Andreas.',
    release_date: '2013-09-17',
    rating: 9.5,
    metacritic_score: 97,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    genres: ['Action', 'Adventure'],
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=85bdc70653bcca9f2a4c6fe41c8f2123d83bd095-7710221-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=85bdc70653bcca9f2a4c6fe41c8f2123d83bd095-7710221-images-thumbs&n=13&w=800'],
  },
  {
    title: 'Minecraft',
    description:
      'Minecraft is a sandbox game that allows players to build and explore virtual worlds made of blocks.',
    release_date: '2011-11-18',
    rating: 9.2,
    metacritic_score: 93,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Adventure', 'Strategy'],
    developer: 'Mojang Studios',
    publisher: 'Microsoft',
    cover_image:
      'https://i.ytimg.com/vi/vAI-5Hzv1FA/maxresdefault.jpg?w=400&h=225&fit=crop',
    screenshots: ['https://i.ytimg.com/vi/vAI-5Hzv1FA/maxresdefault.jpg?w=800'],
  },
  {
    title: 'Spider-Man 2',
    description:
      'Marvel’s Spider-Man 2 lets you swing, glide, and fight as Peter Parker and Miles Morales in an expanded New York.',
    release_date: '2023-10-20',
    rating: 9.1,
    metacritic_score: 90,
    platforms: ['PlayStation'],
    genres: ['Action', 'Adventure'],
    developer: 'Insomniac Games',
    publisher: 'Sony Interactive Entertainment',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=72eb6435f0ae24a72c8f7887a6ea1c82cba5f431-4240958-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=72eb6435f0ae24a72c8f7887a6ea1c82cba5f431-4240958-images-thumbs&n=13&w=1200'],
  },
  {
    title: 'Starfield',
    description:
      'Starfield is a next-generation role-playing game set amongst the stars where you create any character and explore with unmatched freedom.',
    release_date: '2023-09-06',
    rating: 8.3,
    metacritic_score: 83,
    platforms: ['PC', 'Xbox'],
    genres: ['RPG', 'Adventure'],
    developer: 'Bethesda Game Studios',
    publisher: 'Bethesda Softworks',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=ca8c9c0c52b6087c89e6f5f88ed436cf85bd8f64-4236663-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=ca8c9c0c52b6087c89e6f5f88ed436cf85bd8f64-4236663-images-thumbs&n=13&w=1200'],
  },
  {
    title: 'Forza Horizon 5',
    description:
      'Forza Horizon 5 is an open-world racing game set in a vibrant, ever-evolving depiction of Mexico.',
    release_date: '2021-11-09',
    rating: 9.0,
    metacritic_score: 92,
    platforms: ['PC', 'Xbox'],
    genres: ['Sports', 'Racing'],
    developer: 'Playground Games',
    publisher: 'Xbox Game Studios',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=13757914aa5255bdf3991e3da032fc5fbd173526-12661486-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=13757914aa5255bdf3991e3da032fc5fbd173526-12661486-images-thumbs&n=13&w=1200'],
  },
  {
    title: 'The Last of Us Part I',
    description:
      'A gritty action-adventure where Joel and Ellie journey across a post-pandemic United States.',
    release_date: '2013-06-14',
    rating: 9.8,
    metacritic_score: 95,
    platforms: ['PlayStation', 'PC'],
    genres: ['Action', 'Adventure'],
    developer: 'Naughty Dog',
    publisher: 'Sony Interactive Entertainment',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=cc3e06b0f57757078269b432d0315ef8303b3c58-3751006-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=cc3e06b0f57757078269b432d0315ef8303b3c58-3751006-images-thumbs&n=13&w=1200'],
  },
  {
    title: 'Stardew Valley',
    description:
      'Stardew Valley is a farming RPG where you build a thriving farm, make friends, and explore mysterious caves.',
    release_date: '2016-02-26',
    rating: 9.0,
    metacritic_score: 89,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo'],
    genres: ['Strategy', 'Adventure'],
    developer: 'ConcernedApe',
    publisher: 'ConcernedApe',
    cover_image:
      'https://avatars.mds.yandex.net/i?id=7175891a4a790252db136e60046717d22743b331-10242163-images-thumbs&n=13&w=400&h=225&fit=crop',
    screenshots: ['https://avatars.mds.yandex.net/i?id=7175891a4a790252db136e60046717d22743b331-10242163-images-thumbs&n=13&w=1200'],
  },
];

async function seed() {
  console.log('⏳ Seeding database...');
  await db.none('DELETE FROM favorites;');
  await db.none('DELETE FROM games;');

  for (const game of games) {
    await db.none(
      `INSERT INTO games
        (title, description, release_date, rating, metacritic_score, platforms, genres, developer, publisher, cover_image, screenshots)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        game.title,
        game.description,
        game.release_date,
        game.rating,
        game.metacritic_score,
        game.platforms,
        game.genres,
        game.developer,
        game.publisher,
        game.cover_image,
        game.screenshots,
      ]
    );
  }

  console.log('✅ Seed completed');
  pgpEnd();
}

function pgpEnd() {
  const pool = (db as unknown as IDatabase<unknown> & { $pool?: { end: () => void } }).$pool;
  if (pool?.end) {
    pool.end();
  }
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  pgpEnd();
  process.exit(1);
});
