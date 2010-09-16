using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace IrelandDotCom.IPadComp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Entries(string entry) {
            EntryWriter.WriteEntry(entry);
            return Content("{ success: true }");
        }

        public ActionResult ViewEntries() {
            return Content(String.Format("<pre>{0}</pre>", EntryWriter.ViewEntries()));
        }
    }
}
