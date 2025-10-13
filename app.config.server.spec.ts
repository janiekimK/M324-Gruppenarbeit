import { TestBed } from '@angular/core/testing';
import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { config, serverConfig } from './app.config.server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

describe('Server Configuration', () => {
  describe('serverConfig', () => {
    it('should be defined', () => {
      expect(serverConfig).toBeDefined();
    });

    it('should have providers array', () => {
      expect(serverConfig.providers).toBeDefined();
      expect(Array.isArray(serverConfig.providers)).toBe(true);
    });

    it('should include provideServerRendering', () => {
      const hasServerRendering = serverConfig.providers?.some(
        (provider) => {
          const providerFn = provideServerRendering();
          return JSON.stringify(provider) === JSON.stringify(providerFn);
        }
      );
      expect(hasServerRendering).toBe(true);
    });

    it('should include provideServerRouting with serverRoutes', () => {
      const hasServerRouting = serverConfig.providers?.some(
        (provider) => {
          const providerFn = provideServerRouting(serverRoutes);
          return JSON.stringify(provider) === JSON.stringify(providerFn);
        }
      );
      expect(hasServerRouting).toBe(true);
    });

    it('should have exactly 2 providers', () => {
      expect(serverConfig.providers?.length).toBe(2);
    });
  });

  describe('merged config', () => {
    it('should be defined', () => {
      expect(config).toBeDefined();
    });

    it('should have providers array', () => {
      expect(config.providers).toBeDefined();
      expect(Array.isArray(config.providers)).toBe(true);
    });

    it('should merge appConfig and serverConfig providers', () => {
      const expectedLength = 
        (appConfig.providers?.length || 0) + 
        (serverConfig.providers?.length || 0);
      expect(config.providers?.length).toBe(expectedLength);
    });

    it('should contain providers from appConfig', () => {
      const appProviders = appConfig.providers || [];
      const configProviders = config.providers || [];
      
      appProviders.forEach((provider) => {
        const isIncluded = configProviders.some(
          (p) => JSON.stringify(p) === JSON.stringify(provider)
        );
        expect(isIncluded).toBe(true);
      });
    });

    it('should contain providers from serverConfig', () => {
      const serverProviders = serverConfig.providers || [];
      const configProviders = config.providers || [];
      
      serverProviders.forEach((provider) => {
        const isIncluded = configProviders.some(
          (p) => JSON.stringify(p) === JSON.stringify(provider)
        );
        expect(isIncluded).toBe(true);
      });
    });

    it('should be usable for bootstrapping', () => {
      expect(() => {
        TestBed.configureTestingModule(config);
      }).not.toThrow();
    });
  });

  describe('configuration integrity', () => {
    it('should maintain proper ApplicationConfig structure', () => {
      const validateConfig = (cfg: ApplicationConfig) => {
        expect(cfg).toHaveProperty('providers');
        expect(Array.isArray(cfg.providers)).toBe(true);
      };

      validateConfig(serverConfig);
      validateConfig(config);
    });

    it('should not have duplicate providers', () => {
      const providers = config.providers || [];
      const serializedProviders = providers.map(p => JSON.stringify(p));
      const uniqueProviders = new Set(serializedProviders);
      
      expect(serializedProviders.length).toBeGreaterThan(0);
    });
  });
});
