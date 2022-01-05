import http from '@/http-common';

class HeroDataService {
  static findByName(name: string) {
    return http.get(`/search/${name}`);
  }
}

export default new HeroDataService();
