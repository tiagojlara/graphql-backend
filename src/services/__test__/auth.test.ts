import { generateToken, validateCredentials, validateToken } from '../auth.service';


describe('Auth Service', () => {

  it('should validate valid credentials', () => {
    const user = validateCredentials('test', 'test');
    expect(user).toMatchObject({ username: 'test', pass: 'test', rule: 'SELLER' });
  });


  it('should validate invalid credentials', () => {
    try {
      validateCredentials('test', 'invalid');
    } catch (e) {
      expect(e.message).toBe('Invalid Credentials');
    }
  });

  it('should generate jwt', () => {
    const token = generateToken('test', 'test');
    expect(token).toBeDefined();
  });

  it('should validate jwt', () => {
    const token = generateToken('test', 'test');
    const validated = validateToken(token);
    expect(validated).toMatchObject({ username: 'test', pass: 'test', rule: 'SELLER' });
  });

  it('should validate jwt (invalid)', () => {
    try {
      validateToken('token');
    } catch (e) {
      expect(e.message).toBe('Invalid Credentials');
    }
  });

});
