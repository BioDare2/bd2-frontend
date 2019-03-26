import {Environments} from './environments';
import {Environment} from './environment';

describe('Environments', () => {

  let envs: Environments;
  let env: Environment;

  beforeEach(() => {

    env = new Environment();
    env.name = 'E1';
    env.description = 'Desc';

    envs = new Environments();
    envs.environments.push(env);

  });

  it('setup works', () => {

    expect(envs).toBeDefined();
    expect(envs.environments.length).toBe(1);
    expect(envs.environments[0]).toBe(env);
  });

  it('correctly deserializes', () => {

    const jsonTxt = `
      {"environments":[{"name":"LL","description":"Desc"},{"name":"LD","description":null}]}
    `;

    const jsonObj = JSON.parse(jsonTxt);

    const ans = Environments.deserialize(jsonObj);
    expect(ans).toBeDefined();
    expect(ans.environments.length).toBe(2);
    ans.environments.forEach(e => {
      expect(e.constructor).toBe(env.constructor);
    });
    const names = ans.environments.map(e => e.name);
    expect(names).toEqual(['LL', 'LD']);


  });
});
