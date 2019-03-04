using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ReactAspNet.Startup))]
namespace ReactAspNet
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
