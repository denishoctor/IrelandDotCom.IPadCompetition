using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

namespace IrelandDotCom.IPadComp.Controllers {
    public class EntryWriter {
        public static void WriteEntry(string entry) {
            using (StreamWriter writer = File.AppendText(System.Web.HttpContext.Current.Server.MapPath("/static/entries.txt"))) {
                writer.WriteLine(String.Format("{0},{1}", DateTime.Now, entry));
            }
        }
        public static string ViewEntries() {
            string contents = "";
            using (StreamReader reader = File.OpenText(System.Web.HttpContext.Current.Server.MapPath("/static/entries.txt"))) {
                contents += reader.ReadToEnd();
            }
            return contents;
        }
    }
}