import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import MovieGrid from '@/components/MovieGrid';
import CategoryList from '@/components/CategoryList';
import Pagination from '@/components/Pagination';
import MovieCount from '@/components/MovieCount';
import { Movie, Category } from '@/types/movie';

interface Props {
  searchParams: { page?: string };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const currentPage = Number(searchParams.page) || 1;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gratuit-streaming.fr';
  
  return {
    title: 'Film streaming gratuit : trouvez tous les films en streaming sur Gratuit-Streaming.fr',
    description: 'Découvrez les derniers films en streaming gratuit sur Gratuit Streaming',
    alternates: {
      canonical: currentPage > 1 ? baseUrl : `${baseUrl}${searchParams.page ? `?page=${searchParams.page}` : ''}`
    }
  };
}

async function getLatestMovies(page: number = 1): Promise<{ movies: Movie[], totalPages: number }> {
  const limit = 30;
  const offset = (page - 1) * limit;

  const { data: movies, count } = await supabase
    .from('movies')
    .select('*', { count: 'exact' })
    .order('release_date', { ascending: false })
    .range(offset, offset + limit - 1);

  return {
    movies: movies as Movie[] || [],
    totalPages: Math.ceil((count || 0) / limit)
  };
}

async function getCategories(): Promise<Category[]> {
  const { data: categories } = await supabase
    .from('categorie')
    .select('*');
  return categories as Category[] || [];
}

export default async function Home({ searchParams }: Props) {
  const currentPage = Number(searchParams.page) || 1;
  const [{ movies, totalPages }, categories] = await Promise.all([
    getLatestMovies(currentPage),
    getCategories(),
  ]);

  return (
    <main className="container mx-auto px-4 py-8">
      <section>
        <h1 className="text-4xl font-bold mb-4">Film streaming gratuit : trouvez tous les films en streaming sur Gratuit-Streaming.fr</h1>
        
        <p className="text-lg text-white/80 mb-8">
          Bienvenue sur <strong>Gratuit-Streaming.fr</strong>, votre destination ultime pour découvrir et profiter de <strong>films en streaming gratuitement</strong> ! Notre plateforme vous propose une vaste collection de films en streaming, soigneusement sélectionnés pour votre plus grand plaisir. Que vous soyez amateur de films d&apos;action, de comédies romantiques ou de documentaires passionnants, vous trouverez forcément votre bonheur parmi notre catalogue varié.
        </p>

        <MovieCount />
        <MovieGrid movies={movies} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/"
        />
      </section>

      <section className="mt-20">
        <h2 className="text-3xl font-bold mb-8">Catégories populaires</h2>
        <CategoryList categories={categories} />
      </section>

      <section className="mt-20 bg-white/5 rounded-xl p-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Pourquoi choisir Gratuit-Streaming.fr ?</h2>
            <p className="text-white/80">De nos jours, le <strong>streaming gratuit</strong> est devenu une alternative populaire aux traditionnelles plateformes payantes. Mais parmi la multitude de sites de streaming disponibles, pourquoi choisir <strong>Gratuit-Streaming.fr</strong> ? La réponse est simple : nous offrons une large gamme de <strong>films complets</strong> et <strong>séries en streaming</strong>, le tout <strong>sans inscription nécessaire</strong>.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Des films complets et des séries en streaming vf et vostfr</h3>
            <p className="text-white/80">Saviez-vous que <strong>Gratuit-Streaming.fr</strong> propose une collection impressionnante de <strong>films en entier</strong>, allant des classiques intemporels aux nouveautés les plus attendues ? Vous avez accès à une sélection variée de genres, y compris action, comédie, drame, horreur et bien plus encore.</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Les avantages du streaming gratuit</h2>
            <ul className="mt-4 space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Gratuité :</strong> Pas besoin de souscrire à un abonnement coûteux</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Accessibilité :</strong> Disponible sur tous vos appareils</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span><strong>Qualité :</strong> Films en HD et Full HD</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}