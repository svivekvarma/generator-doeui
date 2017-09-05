using System.Configuration;
using Castle.Windsor;
using Castle.Windsor.Installer;
using Castle.MicroKernel.Registration;


namespace DEMO.Services
{


    public static class Injector
    {
        private static readonly object InstanceLock = new object();

        private static IWindsorContainer instance;

        public static IWindsorContainer Instance
        {
            get
            {
                lock (InstanceLock)
                {
                    return instance ?? (instance = GetInjector());
                }
            }
        }

        private static IWindsorContainer GetInjector()
        {
            var container = new WindsorContainer();

            container.Install(FromAssembly.This());

            RegisterInjector(container);
            RegisterTimeComponents(container);

            return container;
        }

        private static void RegisterTimeComponents(WindsorContainer container)
        {
            if (ConfigurationManager.AppSettings["configuration"] == "Prod")
                container.Register(
                       Component.For<iRoleService>()
                       .ImplementedBy(typeof(AARADRoleService))
                       .LifeStyle.Singleton);
            else
                container.Register(
                       Component.For<iRoleService>()
                       .ImplementedBy(typeof(AARADTestRoleService))
                       .LifeStyle.Singleton);
        }

        private static void RegisterInjector(WindsorContainer container)
        {
            container.Register(
                Component.For<IWindsorContainer>()
                .Instance(container));
        }
    }
}

