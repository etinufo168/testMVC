using System;
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Reflection;

namespace NIS.Models
{
    public class form
    {
        SqlConnection link = new SqlConnection();

        public class FormModel
        {
            public string acc { set; get; }
            public string cel { set; get; }
            public string email { set; get; }
            public string pas { set; get; }
        }

        /// <summary>
        /// 撈取物件
        /// </summary>
        public List<FormModel> getData()
        {
            List<FormModel> model = new List<FormModel>();

            DataTable dt = new DataTable();
            link.Open();
            string myCnString = "Data Source=TestDB;Initial Catalog=my_database;Persist Security Info = True; User ID = sa; Password = myPwd";
            string sql = "SELECT * FROM User";
            dt = GetDataTable(myCnString, sql);
            if (dt.Rows.Count > 0)
            {
                model = ConvertDataTable<FormModel>(dt);
            }
            link.Close();

            return model;
        }

        #region function
        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }

        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        public DataTable GetDataTable(string cnString, string sql)
        {
            using (SqlConnection cn = new SqlConnection(cnString))
            {
                cn.Open();
                using (SqlDataAdapter da = new SqlDataAdapter(sql, cn))
                {
                    da.SelectCommand.CommandTimeout = 120;
                    DataSet ds = new DataSet();
                    da.Fill(ds);
                    return ds.Tables[0];
                }
            }
        }
        #endregion
    }
}
