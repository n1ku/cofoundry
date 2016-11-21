﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cofoundry.Core.EmbeddedResources;
using Cofoundry.Web.ModularMvc;

namespace Cofoundry.Web.PageModules
{
    /// <summary>
    /// Bootstraps the registration of PageModule view locations, enabling PageModules to be included in non-standard places.
    /// </summary>
    public class PageModuleBootstrapper : IViewLocationRegistration // , IEmbeddedResourceRouteRegistration
    {
        private readonly IPageModuleViewLocationRegistration[] _pageModuleViewLocationRegistrations;

        public PageModuleBootstrapper(
            IPageModuleViewLocationRegistration[] pageModuleViewLocationRegistrations
            )
        {
            _pageModuleViewLocationRegistrations = pageModuleViewLocationRegistrations;
        }

        // TODO: Not sure why this implements IEmbeddedResourceRouteRegistration? module views don't need to be served as static resources...
        // Is it supposed to be assembly resource registration?
        //public IEnumerable<string> GetEmbeddedResourcePaths()
        //{
        //    var pathsToRegister = _pageModuleViewLocationRegistrations
        //        .SelectMany(r => r.GetPathPrefixes())
        //        .Select(p => FormatEmbeddedResourcePath(p))
        //        .Where(p => p != null);

        //    return pathsToRegister;
        //}

        public ViewLocations GetLocations()
        {
            // Register paths as partial views so that the standard view locator can find them.

            var pathsToRegister = _pageModuleViewLocationRegistrations
                .SelectMany(r => r.GetPathPrefixes())
                .Select(p => FormatViewPath(p))
                .Where(p => p != null)
                .ToArray();

            var locations = new ViewLocations()
            {
                PartialViewLocationFormats = pathsToRegister
            };

            return locations;
        }

        private string FormatViewPath(string pathPrefix)
        {
            if (string.IsNullOrWhiteSpace(pathPrefix)) return null;

            var path = "/" + pathPrefix.Trim('/') + "/{0}.cshtml";

            return path;
        }

        //private string FormatEmbeddedResourcePath(string pathPrefix)
        //{
        //    if (string.IsNullOrWhiteSpace(pathPrefix)) return null;

        //    var path = "/" + pathPrefix.Trim('/');

        //    return path;
        //}
    }
}
