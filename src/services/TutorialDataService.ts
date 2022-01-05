import http from '@/http-common';

class TutorialDataService {
  static age = 28;

  singletonMethod() {
    return 'singletonMethod';
  }

  public static getAll() {
    return http.get('/tutorials');
  }

  static get(id: string) {
    return http.get(`/tutorials/${id}`);
  }

  static create(data: any) {
    return http.post('/tutorials', data);
  }

  static update(id: any, data: any) {
    return http.put(`/tutorials/${id}`, data);
  }

  static delete(id: any) {
    return http.delete(`/tutorials/${id}`);
  }

  static deleteAll() {
    return http.delete('/tutorials');
  }

  static findByTitle(title: string) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();
