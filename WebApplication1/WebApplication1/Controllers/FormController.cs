using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static NIS.Models.form;

namespace WebApplication1.Controllers
{
    public class FormController : Controller
    {
        public ActionResult index()
        {
            return View();
        }

        public ActionResult result(string acc, string cel, string email, string pas)
        {
            FormModel model = new FormModel();

            model.acc = acc;
            model.cel = cel;
            model.email = email;
            model.pas = pas;

            return View(model);
        }

        [HttpPost]
        public ActionResult save(FormModel model)
        {
            //正常流程 先存檔>撈取資料>顯示結果
            //因不用附DB>demo用直接將欄位拋轉
            Boolean json_result = new Boolean();

            if (!string.IsNullOrEmpty(model.acc))
            {
                json_result = true;
            }
            else
            {
                json_result = false;
            }

            return Content(JsonConvert.SerializeObject(json_result), "application/json");
        }
    }
}