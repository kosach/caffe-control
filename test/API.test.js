const createContextMock = (expectedApiKey) => ({
    values: {
      get: (key) => {
        if (key === 'apiAuthKey') return expectedApiKey;
      }
    }
  });
  
  const runAsUserIdScript = (context) => ({ query }) => {
    const authToken = query['auth-token'];
    if (authToken !== context.values.get("apiAuthKey")) {
      console.log('Wrong token', authToken);
      return '648725089edf9286a5e92d51sada';
    }
    console.log('Correct token');
    return "648725089edf9286a5e92d51";
  };
  
  describe('run_as_user_id_script_source', () => {
    let context;
    const correctToken = 'correct-token';
    const expectedUserId = "648725089edf9286a5e92d51";
    const fallbackUserId = "648725089edf9286a5e92d51sada";
  
    beforeEach(() => {
      context = createContextMock(correctToken);
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    test('returns correct user ID with valid token', () => {
      const func = runAsUserIdScript(context);
      const result = func({ query: { 'auth-token': correctToken } });
      expect(result).toBe(expectedUserId);
      expect(console.log).toHaveBeenCalledWith('Correct token');
    });
  
    test('returns fallback ID with invalid token', () => {
      const func = runAsUserIdScript(context);
      const result = func({ query: { 'auth-token': 'wrong-token' } });
      expect(result).toBe(fallbackUserId);
      expect(console.log).toHaveBeenCalledWith('Wrong token', 'wrong-token');
    });
  
    test('returns fallback ID when token is missing', () => {
      const func = runAsUserIdScript(context);
      const result = func({ query: {} });
      expect(result).toBe(fallbackUserId);
      expect(console.log).toHaveBeenCalledWith('Wrong token', undefined);
    });
  });
  

